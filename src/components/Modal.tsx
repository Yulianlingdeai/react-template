import React from "react";
import Modal from "react-modal";
import ImageGallery from "@/components/ImageGallery";
import type { baseMeetingInfo } from "@/types";

export default function ModalComponent({
    meetingInfo,
    isModalOpen,
    closeModal
}: {
    meetingInfo: baseMeetingInfo;
    isModalOpen: boolean;
    closeModal: any;
}) {
    console.log("ModalComponent 组件更新了");
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
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
