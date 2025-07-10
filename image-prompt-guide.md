# Guide des Templates d'Images DALL-E

## Structure d'un Template d'Image

Un template d'image DALL-E doit contenir les éléments suivants :

### Champs Obligatoires
- **`promptType`** : Doit être `"image"` (pas `"text"`)
- **`modelCompatibility`** : Doit inclure `["dall-e-3"]` ou `["dall-e-2"]` ou les deux
- **`promptText`** : Le prompt principal avec des placeholders `{nom_variable}`

### Exemple de Prompt Text Optimisé
```
Create a professional portrait of a {profession} in a {setting} with {style} lighting. The person should appear confident and approachable. Background: {background}. Style: photorealistic, high quality, business professional.
```

### Structure des Input Fields
```json
{
  "name": "profession",
  "label": "Profession",
  "type": "select",
  "placeholder": "Select profession",
  "required": true,
  "options": ["business executive", "doctor", "lawyer", "teacher"]
}
```

## Bonnes Pratiques pour DALL-E

### 1. Spécificité du Prompt
- Utilisez des descriptions détaillées et spécifiques
- Incluez le style artistique (photorealistic, oil painting, digital art)
- Spécifiez l'éclairage et l'arrière-plan

### 2. Catégories Recommandées
- **Portraits** : Headshots, artistic portraits, character design
- **Produits** : E-commerce, marketing, product visualization
- **Concept Art** : Fantasy, sci-fi, game design
- **Logos** : Brand design, corporate identity
- **Scènes** : Landscapes, interiors, environments

### 3. Modèles Compatibles
- **DALL-E 3** : Meilleure qualité, plus de détails, meilleure compréhension
- **DALL-E 2** : Plus rapide, moins cher, bonne qualité

## Exemple Complet

Voici un template complet fonctionnel :

```json
{
  "title": "Product Photography Generator",
  "description": "Create professional product photos for e-commerce",
  "category": "Commercial Photography",
  "promptText": "Professional product photography of {product} on {background} with {lighting} lighting. Commercial style, high resolution, sharp focus, clean composition.",
  "role": "Product photographer",
  "inputType": "Product specifications",
  "objective": "Generate commercial product images",
  "outputFormat": "High-quality product photo",
  "modelCompatibility": ["dall-e-3", "dall-e-2"],
  "inputFields": [
    {
      "name": "product",
      "label": "Product",
      "type": "text",
      "placeholder": "e.g., wireless headphones, coffee mug",
      "required": true
    },
    {
      "name": "background",
      "label": "Background",
      "type": "select",
      "required": true,
      "options": ["white backdrop", "wooden table", "marble surface"]
    },
    {
      "name": "lighting",
      "label": "Lighting",
      "type": "select",
      "required": true,
      "options": ["soft studio", "natural window", "dramatic shadows"]
    }
  ],
  "promptType": "image",
  "rating": 5,
  "tags": ["product", "commercial", "e-commerce"]
}
```

## Import dans l'Admin

1. Accédez au panneau d'administration (mot de passe: 2509-1991)
2. Cliquez sur "Import JSON"
3. Collez le template JSON
4. Cliquez sur "Import"

Le template sera automatiquement ajouté à la base de données avec le type d'image approprié.