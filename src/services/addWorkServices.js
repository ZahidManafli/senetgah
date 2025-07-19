import { GoogleGenAI } from "@google/genai";
import { supabase } from "../supabaseClient";

const ai = new GoogleGenAI({apiKey:"AIzaSyA30tlEOlI_cEb1XRC0D2V74p4UD4t3nPk"});

export const refineUploadWorkDescription = async (description) => {
	const prompt = `Please refine and improve the following work description. Make it more professional, clear, and engaging while maintaining its original meaning:

${description}

Refined description:`;

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: prompt,
		config: {
			systemInstruction: "Please refine and improve the following work description. Make it more professional, clear, and engaging while maintaining its original meaning:",
		  },
	});
	
	return response.text;
}

export const generateImageDescription = async (imageData) => {
	const prompt = `Analyze this image and provide a detailed, professional description of what you see. Focus on:
- Main subject or content
- Visual elements and composition
- Style, colors, and mood
- Any relevant context or details

Write a clear and engaging description. Write in text style do not use markdown`;

const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageData,
      },
    },
    { text: prompt }
  ],
  });
  console.log(result.text);

  return result.text;
}


export const addPostToProfile = async (postData) => {
	try {
		const { title, description, category, imageFile } = postData;
		
		// Get current user
		const { data: { user }, error: userError } = await supabase.auth.getUser();
		if (userError || !user) {
			throw new Error('User not authenticated');
		}

		let imageUrl = null;

		// Upload image to Supabase storage if provided
		if (imageFile) {
			const fileExt = imageFile.name.split('.').pop();
			const fileName = `${user.id}/${Date.now()}.${fileExt}`;
			
			const { error: uploadError } = await supabase.storage
				.from('posts') // Make sure this bucket exists
				.upload(fileName, imageFile);

			if (uploadError) {
				throw new Error(`Image upload failed: ${uploadError.message}`);
			}

			// Get public URL for the uploaded image
			const { data: urlData } = supabase.storage
				.from('posts')
				.getPublicUrl(fileName);
			
			imageUrl = urlData.publicUrl;
		}

		// Create new post object
		const newPost = {
			id: Date.now(), // Simple ID generation
			title,
			description,
			category,
			image: imageUrl,
			createdAt: new Date().toISOString()
		};

		// Get current profile to append to existing posts
		const { data: currentProfile, error: fetchError } = await supabase
			.from('profiles')
			.select('posts')
			.eq('user_id', user.id)
			.maybeSingle();

		if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
			throw new Error(`Failed to fetch profile: ${fetchError.message}`);
		}

		// Prepare updated posts array
		const currentPosts = currentProfile?.posts || [];
		const updatedPosts = [...currentPosts, newPost];

		// Update the profile with new post
		const { data, error: updateError } = await supabase
			.from('profiles')
			.update({
				posts: updatedPosts
			})
			.eq('user_id', user.id)
			.select();

		if (updateError) {
			throw new Error(`Failed to update profile: ${updateError.message}`);
		}

		return {
			success: true,
			post: newPost,
			data
		};

	} catch (error) {
		console.error('Error adding post to profile:', error);
		return {
			success: false,
			error: error.message
		};
	}
};

export const getUserPosts = async () => {
	try {
		// Get current user
		const { data: { user }, error: userError } = await supabase.auth.getUser();
		if (userError || !user) {
			throw new Error('User not authenticated');
		}

		// Get user's profile with posts
		const { data: profile, error: fetchError } = await supabase
			.from('profiles')
			.select('posts')
			.eq('user_id', user.id)
			.maybeSingle();

		if (fetchError) {
			throw new Error(`Failed to fetch posts: ${fetchError.message}`);
		}

		// Return posts array (empty array if no profile or no posts)
		const posts = profile?.posts || [];
		
		return {
			success: true,
			posts: posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), // Sort by newest first
			count: posts.length
		};

	} catch (error) {
		console.error('Error fetching user posts:', error);
		return {
			success: false,
			error: error.message,
			posts: [],
			count: 0
		};
	}
};

