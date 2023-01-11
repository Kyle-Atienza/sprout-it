import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSupplier } from "../features/supplier/supplierSlice";

export const SupplierProductsTableRow = ({
  stash,
  supplier,
  product,
  row,
  editRow,
  deleteRow,
  setEditRow,
  onEditPrice,
}) => {
  const dispatch = useDispatch();

  const [editPriceInput, setEditPriceInput] = useState(false);
  const [priceInput, setPriceInput] = useState();
  const priceInputRef = useRef();

  const editPrice = () => {
    setEditRow(row);
  };

  const cancelEdit = () => {
    setEditRow(-1);
    priceInputRef.current.value = product.price;
  };

  useEffect(() => {
    if (row === editRow) {
      setEditPriceInput(true);
    } else {
      setEditPriceInput(false);
    }
  }, [editRow]);

  const onUpdatePrice = () => {
    dispatch(
      updateSupplier({
        id: supplier._id,
        payload: {
          products: [
            ...supplier.products
              .filter((supplierProduct) => {
                return supplierProduct._id !== product._id;
              })
              .map((supplierProduct) => {
                return {
                  product: supplierProduct.product._id,
                  price: supplierProduct.price,
                };
              }),
            {
              product: product.product._id,
              price: priceInput,
            },
          ],
        },
      })
    );
    setEditRow(-1);
  };

  const onDeleteProduct = () => {
    if (deleteRow) {
      deleteRow(product.product._id);
    } else {
      dispatch(
        updateSupplier({
          id: supplier._id,
          payload: {
            products: [
              ...supplier.products
                .filter((supplierProduct) => {
                  return supplierProduct._id !== product._id;
                })
                .map((supplierProduct) => {
                  return {
                    product: supplierProduct.product._id,
                    price: supplierProduct.price,
                  };
                }),
            ],
          },
        })
      );
      setEditRow(-1);
    }
  };

  return (
    <tr
      className={`transition-all duration-300 ease-in-out cursor-pointer   bg-re ${
        row === editRow
          ? "bg-red-500"
          : stash
          ? "bg-yellow-200"
          : " bg-light-200"
      }`}
    >
      <td className='py-2'>{product.product.name}</td>
      <td className='py-2'>
        <input
          ref={priceInputRef}
          className='p-3 bg-light-100 rounded-lg border-1 border-light-200 open-paragrap-sm focus:ring-primary-500 focus:border-primary-400'
          disabled={!editPriceInput && !stash}
          type='number'
          defaultValue={product.price}
          onChange={
            stash
              ? (e) => onEditPrice(e.target.value)
              : (e) => setPriceInput(e.target.value)
          }
        />
      </td>
      <td>
        {editPriceInput ? (
          <button onClick={onUpdatePrice}>Save</button>
        ) : (
          <button onClick={editPrice}>Edit</button>
        )}
      </td>
      <td>
        {editPriceInput ? (
          <button onClick={cancelEdit}>Cancel</button>
        ) : (
          <button onClick={onDeleteProduct}>Delete</button>
        )}
      </td>
    </tr>
  );
};
