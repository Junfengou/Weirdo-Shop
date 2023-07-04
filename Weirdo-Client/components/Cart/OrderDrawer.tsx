import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useOrderForm } from "./hooks/functions";
import { cartItemList } from "./Recoil/atom";
import { useRecoilState } from "recoil";
 

export type OrderForm = {
    address: string,
    city: string,
    state: string,
    zipCode: string
}

type Props = {
  token: string | null
}

export function OrderDrawer({token}: Props) {
  const [open, setOpen] = React.useState(false);
  const orderFormSubmit = useOrderForm();
  const [cartItemListRecoilState ,setCartItemList] = useRecoilState(cartItemList);
  const [formData, setFormData] = React.useState<OrderForm>({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const openDrawer = () => {
    setOpen(true)
    setFormData({
        address: '',
        city: '',
        state: '',
        zipCode: ''
    })
  };
  const closeDrawer = () => setOpen(false);
 
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    orderFormSubmit(formData, token)
    setOpen(false)
  };

  return (
    <React.Fragment>
      {cartItemListRecoilState?.cartItemList?.length !== 0 && (<Button onClick={openDrawer}>Order</Button>)}
      <Drawer placement="right" open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Place my order
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
          <Input type="text" label="Address" name="address" value={formData.address} onChange={handleInputChange} required />
          <Input type="text" label="City" name="city" value={formData.city} onChange={handleInputChange} required />
          <Input type="text" label="State" name="state" value={formData.state} onChange={handleInputChange} required />
          <Input type="text" label="ZipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          <Button type="submit">Place order</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}