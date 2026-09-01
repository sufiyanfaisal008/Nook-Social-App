import React, { useState } from 'react'
import Header from '../../component/header'
import { store } from '../../store/states'
import { BiUser, BiEnvelope, BiDetail, BiPencil, BiLockAlt, BiChevronRight } from 'react-icons/bi'
import axios from 'axios'
import './profile.scss'
import { baseURL } from '../../core'
import { Modal, Input, message, ConfigProvider, theme } from 'antd';

function Profile() {
  const { user, globalLogin } = store()

  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstname || '')
  const [lastName, setLastName] = useState(user?.lastname || '')

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [file, setFile] = useState(null)

  const handleOpenNameModal = () => {
    setFirstName(user?.firstname || '')
    setLastName(user?.lastname || '')
    setIsNameModalOpen(true);
  };

  const handleSaveName = async () => {
    try {
      await axios.put(
        `${baseURL}/api/v1/profile`,
        { firstname: firstName, lastname: lastName },
        { headers: { token: localStorage.getItem('token') } }
      );

      globalLogin({ ...user, firstname: firstName, lastname: lastName });
      message.success('Edit Successfully...');
      setIsNameModalOpen(false);
    } catch (error) {
      console.error(error)
      message.error(error?.response?.data?.message || error.message);
    }
  }

  const upoload_file = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('my-file', file);

    try {
      const response = await axios.put(`${baseURL}/api/v1/profile-picture`, formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })


      console.log(response)
      
      message.success('Profile Picture Updated Successfully...')


      globalLogin({
        ...user,
        profilePicture: response.data.url
      });
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || error.message);
    }
  }

  const handleOpenPasswordModal = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsPasswordModalOpen(true)
  };

  const handleSavePassword = async () => {
    try {
      if (!currentPassword) {
        message.error('Current Password is Required...');
        return;
      }
      if (!newPassword) {
        message.error('NewPassword is Required...');
        return;
      }
      if (confirmPassword !== newPassword) {
        message.error('Confirm Password Do not match...');
        return;
      }

      await axios.put(
        `${baseURL}/api/v1/password`,
        { currentPassword, newPassword },
        { headers: { token: localStorage.getItem('token') } }
      );

      setIsPasswordModalOpen(false);
      message.success('Password Changed Successfully...');
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: '#14070a',
          colorPrimary: '#ff4d6d',
          colorText: '#fff0f3',
          colorTextPlaceholder: 'rgba(255, 240, 243, 0.4)',
          colorBorder: 'rgba(255, 77, 109, 0.3)',
          borderRadiusLG: 16,
        },
      }}
    >
      <div className="main-profile-page">
        <Header />

        <div className="profile-container">
          <div className="profile-card">

            <div className="profile-header-bg">
              <div className="avatar-wrapper">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="avatar-img"
                  />
                ) : (
                  <BiUser className="avatar-icon"
                    src={user?.profilePicture} />
                )}

                <label
                  htmlFor="avatar-upload"
                  className="avatar-edit-btn"
                  title="Edit Profile Picture"
                >
                  <BiPencil />
                </label>

                <input
                  type="file"
                  onChange={(e) => upoload_file(e.target.files[0])}
                  id="avatar-upload"
                  accept="image/*"
                  hidden
                />
              </div>
            </div>

            {/* Profile Details Body */}
            <div className="profile-body">
              <div className="name-section">
                <div className="display-name-group">
                  <h2 className="user-title">
                    {`${user?.firstname || 'User'} ${user?.lastname || ''}`.trim()}
                  </h2>
                  <button className="edit-pencil-btn" onClick={handleOpenNameModal} title="Edit Name">
                    <BiPencil />
                  </button>
                </div>

                <p className="user-tag">
                  @{user?.firstname?.toLowerCase() || 'username'}
                </p>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <BiEnvelope className="info-icon" />
                  <div className="info-content">
                    <label>Email Address</label>
                    <span>{user?.email || 'email@example.com'}</span>
                  </div>
                  <button className="edit-pencil-btn" title="Edit Email">
                    <BiPencil />
                  </button>
                </div>

                <div className="info-item">
                  <BiDetail className="info-icon" />
                  <div className="info-content">
                    <label>Bio</label>
                    <span>{user?.bio || 'Welcome to my Nook-Social profile!'}</span>
                  </div>
                </div>
              </div>

              <div className="password-accordion">
                <button className="accordion-header" onClick={handleOpenPasswordModal}>
                  <div className="accordion-title">
                    <BiLockAlt className="info-icon" />
                    <span>Change Password</span>
                  </div>
                  <BiChevronRight />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Name Update Modal */}
        <Modal
          title="Update Name"
          open={isNameModalOpen}
          onOk={handleSaveName}
          onCancel={() => setIsNameModalOpen(false)}
          okText="Save"
          cancelText="Cancel"
          rootClassName="custom-styled-modal"
          centered
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </Modal>

        {/* Password Change Modal */}
        <Modal
          title="Change Password"
          open={isPasswordModalOpen}
          onOk={handleSavePassword}
          onCancel={() => setIsPasswordModalOpen(false)}
          okText="Update"
          cancelText="Cancel"
          rootClassName="custom-styled-modal"
          centered
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <Input.Password
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default Profile;