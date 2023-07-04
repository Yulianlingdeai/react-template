import React, { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "@/assets/css/App.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MyCustomImageComponent = ({ original }: { original: string }) => {
    return (
        <TransformWrapper>
            <TransformComponent>
                <img src={original} alt="Image" />
            </TransformComponent>
        </TransformWrapper>
    );
};

export default function ImageGallery({ src }: { src: string }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const images = [
        {
            original: src,
            // thumbnail: "image1-thumbnail.jpg",
            description: "座次图"
        }
        // {
        //     original: src,
        //     // thumbnail: "image1-thumbnail.jpg",
        //     description: "座次图2"
        // }
    ];

    return (
        <div>
            <ReactImageGallery
                items={images}
                startIndex={selectedIndex}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                onSlide={(index) => setSelectedIndex(index)}
                renderItem={(item) => <MyCustomImageComponent original={item.original} />}
            />
        </div>
    );
}
