import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { Link } from 'react-router-dom';
const { Meta } = Card;

const AdminProductsCard = ({ product }) => {
  return (
    <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          alt="product"
          className="p-1"
          src={
            product.images && product.images.length
              ? product.images[0].url
              : laptop
          }
        />
      }
      actions={[
      <Link to={`/admin/product/${product.slug}`}>
        <EditOutlined className="text-warning" />,
      </Link>
      ]}
    >
      <Meta
        title={product.title}
        description={`${
          product.description && product.description.substring(0, 20)
        }...`}
      />
    </Card>
  );
};

export default AdminProductsCard;
