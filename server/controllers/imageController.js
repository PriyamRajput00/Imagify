import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

// Advanced prompt engineering for professional quality images
const enhancePrompt = (prompt) => {
  let enhanced = prompt.trim();
  
  // Remove excessive whitespace and clean
  enhanced = enhanced.replace(/\s+/g, ' ');
  enhanced = enhanced.replace(/[^\w\s\.,!?\-':;()\[\]\/]/g, ' ');
  enhanced = enhanced.replace(/\s+/g, ' ').trim();
  
  // Capitalize properly
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
  
  // Professional quality keywords
  const qualityKeywords = [
    'high quality', 'detailed', 'realistic', 'beautiful', 'professional',
    'photorealistic', '4k', '8k', 'ultra detailed', 'stunning', 'vivid',
    'crisp', 'sharp focus', 'well lit', 'artistic', 'cinematic'
  ];
  
  const hasQualityKeyword = qualityKeywords.some(keyword => 
    enhanced.toLowerCase().includes(keyword)
  );
  
  // Add professional quality modifiers if not present
  if (!hasQualityKeyword && enhanced.length < 100) {
    enhanced = `High quality, detailed, photorealistic ${enhanced}`;
  }
  
  // Add style modifiers if not present (common AI art terms that improve quality)
  const styleKeywords = ['style', 'art', 'render', 'illustration', 'photo'];
  const hasStyleKeyword = styleKeywords.some(keyword =>
    enhanced.toLowerCase().includes(keyword)
  );
  
  if (!hasStyleKeyword && enhanced.length < 120) {
    enhanced = `${enhanced}, sharp focus, well lit, professional`;
  }
  
  return enhanced;
};

// Generate multiple prompt variations for better results
const generatePromptVariations = (prompt) => {
  const base = prompt.trim();
  return [
    enhancePrompt(base),
    `${enhancePrompt(base)}, trending on artstation`,
    `${enhancePrompt(base)}, award winning photography`,
    `${enhancePrompt(base)}, concept art`
  ];
};

export const generateImage = async (req, res) => {
  let enhancedPrompt = '';
  
  try {
    const { prompt } = req.body;
    const userId = req.userId; // Get userId from auth middleware

    // Validate input
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (prompt.length > 500) {
      return res.status(400).json({ success: false, message: "Prompt too long (max 500 characters)" });
    }

    // Enhance the prompt for better quality
    enhancedPrompt = enhancePrompt(prompt);
    
    console.log('Original prompt:', prompt);
    console.log('Enhanced prompt:', enhancedPrompt);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare form data with enhanced prompt
    const formData = new FormData();
    formData.append("prompt", enhancedPrompt);
    
    // Optional: Add advanced parameters for better quality
    // Note: Clipdrop API supports optional parameters
    try {
      // Add model or style parameters if available
      if (process.env.CLIPDROP_MODEL) {
        formData.append("model", process.env.CLIPDROP_MODEL);
      }
    } catch (e) {
      console.log('Note: No model parameter set');
    }

    // Call Clipdrop API with timeout
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 60000, // 60 second timeout for large images
      }
    );

    // Validate response
    if (!data || data.length === 0) {
      throw new Error('Empty response from image generation service');
    }

    // Convert image to base64 with validation
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    
    // Log successful generation stats
    console.log(`✓ Image generated successfully (${Math.round(data.length / 1024)}KB)`);

    // Deduct 1 credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    // Return enhanced response with metadata
    res.json({
      success: true,
      message: "Image generated successfully",
      resultImage,
      metadata: {
        imageSize: Math.round(data.length / 1024),
        format: 'PNG',
        creditsUsed: 1,
        remainingCredits: user.creditBalance - 1
      }
    });
  } catch (error) {
    // Professional error logging
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Image generation failed`);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Original prompt:', prompt);
    console.error('Enhanced prompt:', enhancedPrompt);
    
    // Handle different error types professionally
    if (error.response?.status === 422) {
      let suggestions = [];
      
      // Intelligent error suggestions based on common issues
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes('loin') || (lowerPrompt.includes('family') && lowerPrompt.includes('loin'))) {
        suggestions = ["Family dinner with meat", "Family eating together at table", "People enjoying a meal together"];
      } else if (prompt.length > 200) {
        suggestions = ["Try: A short, focused description (under 100 words)", "Break complex requests into simpler parts"];
      } else if (lowerPrompt.includes('nude') || lowerPrompt.includes('sex') || lowerPrompt.includes('explicit')) {
        suggestions = ["Request contains prohibited content", "Please use family-friendly descriptions"];
      } else {
        suggestions = [
          "Try: More specific and descriptive language",
          "Example: 'A red apple on a wooden table' instead of 'apple'",
          "Add details: 'A beautiful sunset over mountains with vibrant colors'"
        ];
      }
      
      return res.status(422).json({ 
        success: false,
        message: "Unable to generate image from this prompt",
        suggestions: suggestions,
        originalPrompt: prompt
      });
    }
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        success: false, 
        message: "API key is invalid or missing. Please contact support." 
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        success: false, 
        message: "Rate limit exceeded. Please wait a moment before trying again.",
        retryAfter: 60
      });
    }
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ 
        success: false, 
        message: "Request timeout. Please try again with a simpler prompt." 
      });
    }
    
    // Handle network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({ 
        success: false, 
        message: "Service temporarily unavailable. Please try again later." 
      });
    }
    
    res.status(error.response?.status || 500).json({ 
      success: false, 
      message: error.response?.data?.error || error.message || 'An unexpected error occurred'
    });
  }
};
