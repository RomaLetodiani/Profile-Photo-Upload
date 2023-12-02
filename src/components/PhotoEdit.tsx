import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Slider } from 'antd';
import { useState, useRef } from 'react';

type Props = {
  img: string;
  handleSaveChanges: (newPhoto: string) => void;
  handleShowModal: () => void;
  zoomValue: number;
  setZoomValue: React.Dispatch<React.SetStateAction<number>>;
};

const PhotoEdit = ({
  img,
  zoomValue,
  setZoomValue,
  handleShowModal,
  handleSaveChanges,
}: Props) => {
  const [editedPhoto, setEditedPhoto] = useState<string>(img);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editZoom, setEditZoom] = useState<number>(zoomValue);

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setEditedPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    setEditZoom(20);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    handleSaveChanges(editedPhoto);
    setZoomValue(editZoom);
  };

  const handleZoomIncrease = () => {
    if (editZoom < 100) {
      setEditZoom(editZoom + 10);
    }
  };

  const handleZoomDecrease = () => {
    if (editZoom > 10) {
      setEditZoom(editZoom - 10);
    }
  };

  return (
    <Flex vertical align="center" justify="center" gap={20}>
      <Button onClick={handleButtonClick}>Add Photo</Button>
      <input
        style={{ display: 'none' }}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUploadPhoto}
      />
      <div className="profile-image-div">
        <img
          style={{ transform: `scale(${(editZoom + 100) / 100})` }}
          src={editedPhoto}
          alt="profile"
        />
      </div>
      <Flex gap={10}>
        <Button onClick={handleZoomDecrease}>
          <MinusOutlined />
        </Button>
        <Slider
          value={editZoom}
          style={{ width: 200 }}
          step={10}
          min={10}
          max={100}
          onChange={(value) => setEditZoom(value)}
        />
        <Button onClick={handleZoomIncrease}>
          <PlusOutlined />
        </Button>
      </Flex>
      <Flex gap={10}>
        <Button onClick={handleShowModal}>Cancel</Button>
        <Button type="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Flex>
    </Flex>
  );
};

export default PhotoEdit;
