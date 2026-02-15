import { useState, useEffect } from 'react';
import PasswordGate from './components/PasswordGate';
import BookViewer from './components/BookViewer';
import GalleryView from './components/GalleryView';
import UploadModal from './components/UploadModal';
import { listImagesFromDropbox, uploadImageToDropbox, deleteImageFromDropbox } from './services/dropboxService';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [images, setImages] = useState([]);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Load initial images
    useEffect(() => {
        if (isAuthenticated) {
            loadImages();
        }
    }, [isAuthenticated]);

    const loadImages = async () => {
        const imgs = await listImagesFromDropbox();
        setImages(imgs);
    };

    const handleUpload = async ({ file, name }) => {
        const newImage = await uploadImageToDropbox(file, name);
        setImages([...images, newImage]);
    };

    const handleDelete = async (id) => {
        await deleteImageFromDropbox(id);
        setImages(images.filter(img => img.id !== id));
    };

    const handleDownload = (img) => {
        const link = document.createElement('a');
        link.href = img.url;
        link.download = img.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container relative bg-[#0f0f13] h-screen w-screen overflow-hidden">
            {!isAuthenticated && (
                <PasswordGate onUnlock={() => setIsAuthenticated(true)} />
            )}

            {isAuthenticated && (
                <>
                    <BookViewer
                        images={images}
                        onOpenUpload={() => setIsUploadOpen(true)}
                        onOpenGallery={() => setIsGalleryOpen(true)}
                    />

                    <GalleryView
                        isOpen={isGalleryOpen}
                        onClose={() => setIsGalleryOpen(false)}
                        images={images}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                    />

                    <UploadModal
                        isOpen={isUploadOpen}
                        onClose={() => setIsUploadOpen(false)}
                        onUpload={handleUpload}
                    />
                </>
            )}
        </div>
    );
}

export default App;
