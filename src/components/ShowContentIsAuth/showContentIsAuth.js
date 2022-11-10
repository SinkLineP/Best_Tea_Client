import React from 'react';

export const showContentIsAuth = (label, userInput, massageError) => {
  return (
    <p>{label}: {userInput === null || userInput === "" ? massageError : userInput}</p>
  );
}

export const showContentIsAuthNoLabel = (userInput, massageError) => {
  return (
    userInput === null || userInput === "" ? massageError : userInput
  );
}

export const changeClassIsActive = (isActive, idButton, activeClass, notActiveClass) => {
  return isActive.clname === "name" + idButton ? activeClass : notActiveClass;
}

export const decoderIsActivePayment = (isActive) => {
  if (isActive.clname === "name0") {
    return "cash-payment"
  } else if (isActive.clname === "name1") {
    return "online-payment"
  } else if (isActive.clname === "name2") {
    return "no-cash-payment"
  }
}