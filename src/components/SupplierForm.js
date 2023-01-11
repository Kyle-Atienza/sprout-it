import React, { useEffect, useRef } from "react";
import { MaterialForm, PrimaryButton } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupplier,
  updateSupplier,
} from "../features/supplier/supplierSlice";
import { PlusOutlined } from "@ant-design/icons";
import { SupplierProductsTableRow } from "./SupplierProductsTableRow";

export const SupplierForm = ({ closeForm, supplierId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { materials } = useSelector((state) => state.inventory);
  const { suppliers } = useSelector((state) => state.supplier);
  const [supplier, setSupplier] = useState({});
  const [editRow, setEditRow] = useState(null); //index of currently edited row
  const [productsStash, setProductsStash] = useState([]);

  const selectProductRef = useRef();
  const priceInputProductRef = useRef();

  useEffect(() => {
    setSupplier(suppliers.find((supplier) => supplier._id === supplierId));

    return () => {
      setSupplier({});
    };
  }, []);

  useEffect(() => {
    console.log([suppliers]);
  }, [suppliers]);

  const [supplierData, setSupplierData] = useState({
    name: "",
    address: "",
    contact: "",
    products: [],
  });
  const [product, setProduct] = useState({
    product: "",
    price: 0,
  });

  const { name, address, contact } = supplierData;

  const onCreateSupplier = () => {
    if (user.role === "owner") {
      dispatch(
        createSupplier({
          name: name,
          address: address,
          contact: contact,
          products: productsStash,
        })
      );
      closeForm();
      setSupplierData({
        name: "",
        address: "",
        contact: "",
        products: [],
      });
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onUpdateSupplier = () => {
    if (user.role === "owner") {
      dispatch(
        updateSupplier({
          id: supplier._id,
          payload: {
            name: name,
            address: address,
            contact: contact,
            products: [
              ...supplier.products.map((product) => ({
                product: product.product._id,
                price: product.price,
              })),
              ...productsStash,
            ],
          },
        })
      );
    } else {
      alert("Restricted to Owner Only");
    }
  };

  const onStashProduct = () => {
    console.log("add");

    setProductsStash([...productsStash, product]);
    selectProductRef.current.selectedIndex = 0;
    priceInputProductRef.current.value = "";
    setProduct({
      product: "",
      price: "",
    });
  };

  const onChange = (e) => {
    setSupplierData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSetProduct = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "price"
          ? parseFloat(e.target.value).toFixed(2)
          : e.target.value,
    }));
  };

  useEffect(() => {
    if (supplier) {
      setSupplierData({
        name: supplier.name,
        address: supplier.address,
        contact: supplier.contact,
      });
    }
  }, [supplier]);

  useEffect(() => {
    setSupplier(suppliers.find((supplier) => supplier._id === supplierId));
    setProductsStash([]);
  }, [suppliers]);

  return (
    <>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Supplier
        </label>
        <div className='flex justify-center items-center'>
          <input
            defaultValue={name}
            className='w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='name'
            type='text'
            required
            onChange={onChange}
          />
        </div>
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Address
        </label>
        <div className='flex justify-center items-center'>
          <input
            defaultValue={address}
            className='w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='address'
            type='text'
            required
            onChange={onChange}
          />
        </div>
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Contact
        </label>
        <div className='flex justify-center items-center'>
          <input
            defaultValue={contact}
            className='w-full p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='contact'
            type='text'
            required
            onChange={onChange}
          />
        </div>
      </div>
      <div className='mb-4'>
        <label className='block open-button' htmlFor='username'>
          Products
        </label>
        <div className='overflow-x-auto harvests-table p-4 shadow-md bg-light-200 rounded-sm'>
          <table className='w-full text-sm text-left'>
            <thead className='poppins-paragraph-sm'>
              <tr>
                <th scope='col' className='py-2'>
                  Product
                </th>
                <th scope='col' className='py-2'>
                  Price
                </th>
                <th scope='col' className='py-2'>
                  Edit
                </th>
                <th scope='col' className='py-2'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {supplier && supplier.products
                ? supplier.products.map((product, index) => {
                    return (
                      <SupplierProductsTableRow
                        supplier={supplier}
                        setEditRow={(rowIndex) => setEditRow(rowIndex)}
                        editRow={editRow}
                        row={index}
                        product={product}
                        key={index}
                      />
                    );
                  })
                : null}
              {productsStash.map((product, index) => {
                return (
                  <SupplierProductsTableRow
                    stash
                    setEditRow={(rowIndex) => setEditRow(rowIndex)}
                    deleteRow={(id) =>
                      setProductsStash(
                        productsStash.filter(
                          (product) => product.product !== id
                        )
                      )
                    }
                    onEditPrice={(price) =>
                      setProductsStash(
                        productsStash.map((editProduct) => {
                          if (editProduct.product === product.product) {
                            return {
                              product: editProduct.product,
                              price: price,
                            };
                          }

                          return editProduct;
                        })
                      )
                    }
                    editRow={editRow}
                    row={index}
                    product={{
                      product: materials.find(
                        (material) => material._id === product.product
                      ),
                      price: product.price,
                    }}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <select
            id='product'
            className='pl-3 pt-3 pb-3 pr-6 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
            name='product'
            onChange={onSetProduct}
            required
            ref={selectProductRef}
          >
            <option hidden defaultValue>
              Select Material
            </option>
            {materials
              .filter((material) => !material.isHidden)
              .filter((material) => {
                if (supplier && supplier.products) {
                  const existingProductsSet = new Set([
                    ...supplier.products.map(({ product }) => product._id),
                    ...productsStash.map(({ product }) => product),
                  ]);
                  return !existingProductsSet.has(material._id);
                }
                return true;
              })
              .map((material, index) => {
                return (
                  <option value={material._id} key={index}>
                    {material.name}
                  </option>
                );
              })}
          </select>
          <div className='flex items-center gap-2'>
            <p>₱</p>
            <input
              defaultValue='0'
              className='w-24 p-3 mr-3 my-2 bg-light-200 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
              name='price'
              type='number'
              min='1'
              step='any'
              required
              onChange={onSetProduct}
              ref={priceInputProductRef}
            />
          </div>
          <button
            onClick={
              Object.keys(product).every((key) => product[key])
                ? onStashProduct
                : null
            }
            className='bg-primary-400 w-12 h-12 rounded-full pb-1'
          >
            <PlusOutlined className='text-light-100' />
          </button>
        </div>
      </div>
      <PrimaryButton
        onClick={supplierId ? onUpdateSupplier : onCreateSupplier}
        name={supplierId ? "Update Supplier" : "Create Supplier"}
      />
    </>
  );
};
