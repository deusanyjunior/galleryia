"use client";
// Gallery.tsx

import React, { useEffect, useState } from 'react';
import GImage from './GImage';

interface ImageData {
    id: string;
    url: string;
    name: string;
    tags: string[];
}

interface GalleryProps {
    reloadGallery: boolean;
  }

const Gallery: React.FC<GalleryProps> = ({ reloadGallery }) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/py/get');
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const respJson = await response.json()
                const files = respJson.files || [];
                const data: ImageData[] = files.map((file: any) => ({
                    id: file.id,
                    url: file.url,
                    name: file.name,
                    tags: file.tags,
                }));
                setImages(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [reloadGallery]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="gallery grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => ( // TypeError: images.map is not a function 
                <GImage imageUrl={image.url} key={image.id} name={image.name} tags={image.tags} />
            ))}
        </div>
    );
};

export default Gallery;