// Dummy data for images - replace with actual data
const dummyImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/images/placeholder-thumbnail.png`,
  alt: `Thumbnail ${i + 1}`,
}));

const ImageThumbnailsSection = () => {
  return (
    <div className="mb-6">
      <div className="font-medium mb-2">컷씬 이미지</div>
      <div className="flex items-center space-x-2 overflow-x-auto p-2 bg-gray-100 rounded">
        {dummyImages.map((img) => (
          <div key={img.id} className="flex-shrink-0 w-16 h-12 border-2 border-transparent hover:border-blue-500 cursor-pointer rounded overflow-hidden relative">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-br">
              {img.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageThumbnailsSection; 