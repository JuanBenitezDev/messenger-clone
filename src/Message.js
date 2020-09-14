import React, { forwardRef } from "react";
import "./Message.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Message = forwardRef(({ message, user, isLast, isFirst, IsSameUserAsBefore }, ref) => {
  const isUser = user === message.username;

  return (
    // true && expression always evaluates to expression, false && expression always evaluates to false
    <div
      ref={ref}
      className={`message ${
        isUser ? "message__userCard" : "message__guestCard"
      } ${IsSameUserAsBefore && "message__sameUser"} 
      ${isFirst && "message__first"} ${isLast && "message__last"} `}
    >
      <span>{!isUser && `${message.username || "Uknown"}`}</span>
      <Card ref={ref} className="message__card">
        <CardContent>
          <Typography variant="body2" component="p">
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
