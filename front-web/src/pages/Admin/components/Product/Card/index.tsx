import { Product } from "types/product";
import { Link } from "react-router-dom";
import { isAllowedByRole } from "utils/auth";
import "./styles.scss";

type Props = {
  product: Product;
  onRemove: (productId: number) => void; 
}; 

const ProductCard = ({ product, onRemove }: Props) => {
  return (
    <div className="base-card text-center mb-1 p-2 border-radius-20">
      <h5>{product.name}</h5>
      <h5>{product.weight}</h5>
        <div>
          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/products/${product.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mr-3">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(product.id)}>
              EXCLUIR
            </button>
            </>    
          )}
      </div>
    </div>
  );
};

export default ProductCard;
