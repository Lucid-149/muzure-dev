from PIL import Image
import os

def convert_to_webp(input_path, output_path):
    try:
        # Open the PNG image
        with Image.open(input_path) as img:
            # Convert the image to WebP format
            img.convert("RGB").save(output_path, "WEBP")
        print(f"Image converted: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Failed to convert image: {input_path}")
        print(e)

def batch_convert_to_webp(input_dir, output_dir):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Iterate over each file in the input directory
    for filename in os.listdir(input_dir):
        if filename.endswith(".png"):
            # Construct input and output paths
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + ".webp")
            # Convert the image
            convert_to_webp(input_path, output_path)

# Example usage:
input_directory = "/home/peter/Documents/work/dest"
output_directory = "/home/peter/Documents/work/dest/upload"
batch_convert_to_webp(input_directory, output_directory)
