import {Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
    const history = useHistory();
    const { slug } = useParams();
    
    const user = useSelector(state => state.user);
    const [modalVisible, setModalVisible] = useState(false);

    function handleModal() {
        if(user && user.token) {
            setModalVisible(true);
        } else {
            history.push({ 
                pathname: '/login', 
                state: { from: `/product/${slug}` }
            });
        }
    }
  return (
      <>
      <div onClick={handleModal}>
        <StarOutlined className='text-danger'/>
        <br /> 
        { user ? 'leave a rating' : 'login to leave rating.' }
      </div>

      <Modal 
      title="leave your rating"
      centered
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false);
        toast.success('thanks for your review');
      }}
      onCancel={()=> setModalVisible(false)}
      >
          { children }
      </Modal>
      </>
  )
}

export default RatingModal;