import { Modal, Button, Flex } from 'antd';
import { useState } from 'react';
import PhotoEdit from './PhotoEdit';
import defaultPhoto from '../../assets/images/defaultProfile.png';

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [zoomValue, setZoomValue] = useState<number>(30);
  const [profilePhoto, setProfilePhoto] = useState<string>(defaultPhoto);

  const handleShowModal = () => {
    setEditMode((prev) => !prev);
  };

  const handleSaveChanges = (newPhoto: string) => {
    setProfilePhoto(newPhoto);
    handleShowModal();
  };
  return (
    <Flex vertical align="center" justify="center" gap={20}>
      <h1>Profile</h1>
      <div className="profile-image-div">
        <img
          style={{ transform: `scale(${(zoomValue + 100) / 100})` }}
          src={profilePhoto}
          alt="Profile"
        />
      </div>
      <Button onClick={handleShowModal}>Edit Photo</Button>
      <Modal
        title="Add or change the current profile photo"
        open={editMode}
        onCancel={handleShowModal}
        footer={null}
      >
        <PhotoEdit
          handleSaveChanges={handleSaveChanges}
          handleShowModal={handleShowModal}
          img={profilePhoto}
          zoomValue={zoomValue}
          setZoomValue={setZoomValue}
        />
      </Modal>
    </Flex>
  );
};

export default Profile;
