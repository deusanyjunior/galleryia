import React from 'react';

interface GImageProps {
    imageUrl: string;
    name: string;
    tags: string[];
}

const GImage: React.FC<GImageProps> = ({ imageUrl, name, tags }) => {
    return (
        <div>
            <img
                className="h-auto max-w-full rounded-lg"
                src={imageUrl}
                alt={name}
            />
            <div className="flex items-center justify-between mt-2">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue">
                   Name: {name}
                </h3>
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-blue-500 dark:text-blue-400">
                   Tags: {tags.join(', ')}
                </span>
            </div>
        </div>
    );
};

export default GImage;