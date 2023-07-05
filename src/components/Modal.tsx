import React from "react";
import Modal from "react-modal";
import ImageGallery from "@/components/ImageGallery";
import type { baseMeetingInfo } from "@/types";

export default function ModalComponent({
    meetingInfo,
    index,
    isModalOpen,
    closeModal
}: {
    meetingInfo: baseMeetingInfo;
    index: number;
    isModalOpen: boolean;
    closeModal: any;
}) {
    console.log("modal更新了");
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
                closeModal();
            }}
            // contentLabel="Image Gallery Modal"
            ariaHideApp={false}
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <div style={{ touchAction: "pan-y", maxHeight: "100vh" }}>
                <ImageGallery
                    src={"http://47.109.100.216:5003/media/" + meetingInfo.seatChart}
                ></ImageGallery>
            </div>
        </Modal>
    );
}
