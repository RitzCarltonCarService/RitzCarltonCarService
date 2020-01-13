export const emailValidator = email => {
   const regEx = /\S+@\S+.com/;

   if (!email || email.length <= 0) return "Email cannot be empty.";
   if (!regEx.test(email)) return "Ooops! We need a valid email address.";

   return "";
};

export const passwordValidator = password => {
   const regEx = /\S{7,}/
   if (!password || password.length <= 0) return "Password cannot be empty.";
   if (!regEx.test(password)) return "Password cannot be 6 characters or less";

   return "";
};

export const nameValidator = name => {
   if (!name || name.length <= 0) return "Name cannot be empty.";

   return "";
};
