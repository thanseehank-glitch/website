import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import "./css/Edit.css";
function Edit() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState({
        brand: "",
        name: "",
        price: "",
        description: "",
        image: ""
    })



    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                toast.error("not find")
                console.log(error)
                navigate("/adminpanel/products")
            })
    }, [id, navigate])

    const handilChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

  

    const handilSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/products/${id}`, product)
            toast.success("Updated successfully!")
        } catch (error) {
            console.log(error)
            toast.error("Update failed.")
        }
    }
    return (
        <div className="edit-page">
            <div className="edit-card">
                <h2 className="edit-title">Edit Watch</h2>

                <form onSubmit={handilSubmit} className="edit-form">


                    <div className="form-group">
                        <label className="form-label">Brand</label>
                        <input
                            className="form-input"
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handilChange}
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handilChange}
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input
                            className="form-input"
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handilChange}
                        />
                    </div>



                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            name="description"
                            value={product.description}
                            onChange={handilChange}
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input
                            className="form-input"
                            type="text"
                            name="image"
                            value={product.image}
                            onChange={handilChange}
                        />
                    </div>

                    <button type="submit" className="update-btn">
                        Update
                    </button>

                </form>
            </div>
        </div>
    );

}

export default Edit