# How to Embed a YouTube Video in Markdown

Markdown files natively support HTML, which means you can easily embed YouTube videos using the `<iframe>` code provided directly by YouTube. 

Follow these simple steps to embed a video into your `.md` document:

### Step 1: Open the Share Menu
Navigate to the YouTube video you want to embed. Click the **Share** button located below the video player, and then select the **Embed** option from the share menu.

![Select Embed Option](<Screenshot 2026-03-09 at 4.09.08 PM.png>)

### Step 2: Copy the Embed Code
An "Embed Video" dialog box will appear displaying the HTML code for the video. Click the **Copy** button in the bottom right corner of the dialog to copy the entire `<iframe>` snippet to your clipboard.

![Copy Embed Code](<Screenshot 2026-03-09 at 4.09.29 PM.png>)

### Step 3: Paste into Your Markdown File
Open your target markdown (`.md`) file and paste the copied `<iframe>` code exactly where you want the video to be displayed. 

Your pasted HTML code will look something like this:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/X8NoAXgGIP8?si=NElTNjk8YyZH1Aca" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

Once pasted, the video will automatically be rendered as an embedded player when the markdown document is previewed or published on the site.
