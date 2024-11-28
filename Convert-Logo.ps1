$logo = ".\logo.webp"
$sizes = @(
    "16x16",
    "32x32",
    "48x48",
    "64x64",
    "128x128",
    "256x256",
    "512x512",
    "1024x1024"
)
foreach ($size in $sizes) {
    $output = ".\extension\logo-$size.png"
    & magick convert $logo -resize $size $output
}