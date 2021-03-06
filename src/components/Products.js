import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import placeholderimg from "./imgs/placeholderimg.png";
import { editOrder, editProduct, getAllProducts, addOrder } from "../api";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20%",
    margin: "2%",
  },
  media: {
    height: 250,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalWrapper = ({ classes, handleClose, open, selectedProduct }) => {
  console.log(selectedProduct)
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div>
      <h2 style={{backgroundColor:'white', padding:'2.5%'}}>These are the best shoes I've ever seen!</h2>
     
      <h2 style={{backgroundColor:'white', padding:'2.5%'}}>I can run 30 mph now!</h2>

      <h2 style={{backgroundColor:'white', padding:'2.5%'}}>They were only clean for a week...</h2>
      </div>
      {/* <Fade in={open}>
        {selectedProduct ? selectedProduct.reviews.map((review) => (
          <div className={classes.paper}>
          <h2 id="transition-modal-title">{review.reviewtext}</h2>
          </div>
        )): null}
      </Fade> */}
    </Modal>
  );
};

/**
 * Either attach count to each product or you would need to keep
 * track of the products that are currently in the cart
 */
function Products({ products, count, setCount, setProducts, username }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userNameKey = localStorage.getItem(`Username`);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    try {
      Promise.all([getAllProducts()]).then(([data]) => {
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  

  const handleOpen = (product) =>
    function () {
      setSelectedProduct(product);
      setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
  };

  const addToCart = async (product) => {
    setCount(count + 1);
    let newQuantity = product.quantity - 1;

    if (count === 1) {
      const order = await addOrder(
        null,
        product.id,
        null,
        product.price,
        count,
        userNameKey
      );
      localStorage.setItem("orderid", order.orderid);

      await editProduct(product.id, null, null, null, newQuantity);

      try {
        Promise.all([getAllProducts()]).then(([data]) => {
          setProducts(data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const order = await addOrder(
        null,
        product.id,
        localStorage.getItem("orderid"),
        product.price,
        count,
        userNameKey
      );
      try {
        Promise.all([getAllProducts()]).then(([data]) => {
          setProducts(data);
        });
      } catch (error) {
        console.log(error);
      }

      let newQuantity = product.quantity - 1;

      await editProduct(product.id, null, null, null, newQuantity);
    }
  };
  console.log(products);

  return (
    <>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product, index) => (
            <Card className={classes.root} key={index} id={index}>
              <CardMedia
                className={classes.media}
                image={product.img ? product.img : placeholderimg}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  variant="h5"
                  component="h5"
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="textPrimary"
                  variant="h5"
                  component="h5"
                >
                  ${product.price}
                </Typography>

                <Typography
                  variant="body2"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  Quantity : {product.quantity}
                </Typography>
              </CardContent>

              <CardActions>
                {product.reviews.length !== 0 ? (
                  <Button
                    size="small"
                    style={{ backgroundColor: "#0A8754", color: "white" }}
                    variant="contained"
                    type="button"
                    onClick={handleOpen(product)}
                  >
                    Reviews
                  </Button>
                ) : null}

                <Button
                  variant="outlined"
                  size="small"
                  style={{ backgroundColor: "#26F0F1", color: "black" }}
                  endIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <ModalWrapper
        classes={classes}
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
      />
    </>
  );
}
// ********************************** ADD A NOTIFICATION TO THE CART ICON **************************//
export default Products;
