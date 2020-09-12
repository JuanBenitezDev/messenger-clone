import React, { forwardRef } from "react";
import "./Message.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Message = forwardRef(({ message, user, isLast, isFirst }, ref) => {
  const isUser = user === message.username;

  return (
    // true && expression always evaluates to expression, false && expression always evaluates to false
    <Card
      ref={ref}
      className={`message ${
        isUser ? "message__userCard" : "message__guestCard"
      } ${isFirst && "message__first"} ${isLast && "message__last"} `}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {!isUser && `${message.username || "Uknown"} :`} {message.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
);

export default Message;
