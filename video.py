import subprocess
import os

def convert_mp4_to_webm(input_file):
    # Check if the input file exists
    if not os.path.isfile(input_file):
        raise FileNotFoundError(f"The file {input_file} does not exist.")
    
    # Define the output file name
    output_file = os.path.splitext(input_file)[0] + '.webm'

    # FFmpeg command to convert MP4 to WebM
    command = [
        'ffmpeg',
        '-i', input_file,
        '-c:v', 'libvpx-vp9',
        '-c:a', 'libopus',
        output_file
    ]

    try:
        # Execute the command
        subprocess.run(command, check=True)
        print(f"Conversion complete: {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")
        raise

# Example usage
if __name__ == "__main__":
    input_file = '/home/peter/Documents/Production/MUZURE-PRO-V1/APP/muzure/Muzure Travel 04.mp4'  # Replace with your input file path
    try:
        convert_mp4_to_webm(input_file)
    except Exception as e:
        print(e)
