import React from 'react-native';
const { width, height } = React.Dimensions.get('window');

export const units = {
   vw: width / 100,
   vh: height / 100,
   vmin: Math.min(width / 100, height / 100),
   vmax: Math.max(width / 100, height / 100),
};

export const emailValidator = email => {
   const regEx = /\S+@\S+\.\S+/;

   if (!email || email.length <= 0) return "Email cannot be empty.";
   if (!regEx.test(email)) return "Ooops! We need a valid email address.";

   return "";
};

export const passwordValidator = password => {
   const regEx = /\S{6,}/;

   if (!password || password.length <= 0) return "Password cannot be empty.";
   if (!regEx.test(password)) return "Password cannot be 6 characters or less";

   return "";
};

export const nameValidator = name => {
   if (!name || name.length <= 0) return "Name cannot be empty.";

   return "";
};
