-- Sample image prompts for DALL-E
INSERT INTO prompts (
  title, 
  description, 
  category, 
  prompt_text, 
  role, 
  input_type, 
  objective, 
  output_format, 
  model_compatibility, 
  input_fields, 
  prompt_type, 
  rating, 
  tags
) VALUES 
(
  'Professional Portrait Generator',
  'Generate high-quality professional portraits for business use with customizable backgrounds and styling.',
  'Image Generation',
  'Create a professional portrait of a {profession} in a {setting} with {style} lighting. The person should appear confident and approachable. Background: {background}. Style: photorealistic, high quality, business professional.',
  'Professional photographer',
  'Structured prompts',
  'Generate professional headshots and portraits',
  'High-quality professional images',
  ARRAY['dall-e-3', 'dall-e-2'],
  '[
    {
      "name": "profession",
      "label": "Profession",
      "type": "select",
      "placeholder": "Select profession",
      "required": true,
      "options": ["business executive", "doctor", "lawyer", "teacher", "engineer", "consultant"]
    },
    {
      "name": "setting",
      "label": "Setting",
      "type": "select",
      "placeholder": "Select setting",
      "required": true,
      "options": ["modern office", "medical facility", "library", "conference room", "studio"]
    },
    {
      "name": "style",
      "label": "Lighting Style",
      "type": "select",
      "placeholder": "Select lighting",
      "required": true,
      "options": ["natural", "studio", "soft", "dramatic", "corporate"]
    },
    {
      "name": "background",
      "label": "Background",
      "type": "select",
      "placeholder": "Select background",
      "required": true,
      "options": ["neutral gray", "office environment", "blurred cityscape", "plain white", "subtle texture"]
    }
  ]'::jsonb,
  'image',
  5,
  ARRAY['portrait', 'professional', 'business', 'headshot']
),
(
  'Creative Concept Art Generator',
  'Generate imaginative concept art for games, movies, and creative projects with detailed environmental and character descriptions.',
  'Image Generation',
  'Create a {art_style} concept art of a {subject} in a {environment}. Mood: {mood}. Color palette: {colors}. Include intricate details and atmospheric lighting.',
  'Concept artist',
  'Creative descriptions',
  'Generate artistic concept visuals',
  'Detailed concept artwork',
  ARRAY['dall-e-3'],
  '[
    {
      "name": "art_style",
      "label": "Art Style",
      "type": "select",
      "placeholder": "Select art style",
      "required": true,
      "options": ["fantasy", "sci-fi", "steampunk", "cyberpunk", "medieval", "futuristic"]
    },
    {
      "name": "subject",
      "label": "Main Subject",
      "type": "text",
      "placeholder": "e.g., mystical forest, space station, ancient temple",
      "required": true
    },
    {
      "name": "environment",
      "label": "Environment",
      "type": "text",
      "placeholder": "e.g., floating islands, underground caverns, alien planet",
      "required": true
    },
    {
      "name": "mood",
      "label": "Mood/Atmosphere",
      "type": "select",
      "placeholder": "Select mood",
      "required": true,
      "options": ["mysterious", "epic", "serene", "dramatic", "ominous", "magical"]
    },
    {
      "name": "colors",
      "label": "Color Palette",
      "type": "select",
      "placeholder": "Select colors",
      "required": true,
      "options": ["warm earth tones", "cool blues and purples", "vibrant neons", "muted pastels", "deep shadows", "golden hour"]
    }
  ]'::jsonb,
  'image',
  5,
  ARRAY['concept art', 'fantasy', 'creative', 'environment']
),
(
  'Product Visualization Creator',
  'Generate professional product images for e-commerce and marketing with customizable backgrounds and lighting.',
  'Image Generation',
  'Create a professional product photograph of a {product} on a {background} with {lighting} lighting. Style: clean, modern, commercial photography. High resolution and sharp details.',
  'Product photographer',
  'Product specifications',
  'Create commercial product visuals',
  'High-quality product images',
  ARRAY['dall-e-3', 'dall-e-2'],
  '[
    {
      "name": "product",
      "label": "Product Description",
      "type": "text",
      "placeholder": "e.g., sleek wireless headphones, artisanal coffee mug, modern smartphone",
      "required": true
    },
    {
      "name": "background",
      "label": "Background",
      "type": "select",
      "placeholder": "Select background",
      "required": true,
      "options": ["pure white", "gradient gray", "wooden surface", "marble texture", "minimalist studio", "lifestyle setting"]
    },
    {
      "name": "lighting",
      "label": "Lighting Style",
      "type": "select",
      "placeholder": "Select lighting",
      "required": true,
      "options": ["soft studio", "dramatic shadows", "even illumination", "natural window", "professional ring", "backlit"]
    }
  ]'::jsonb,
  'image',
  4,
  ARRAY['product photography', 'commercial', 'e-commerce', 'marketing']
);