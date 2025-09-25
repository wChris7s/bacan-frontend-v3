import { Rating, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CommentProps {
  title: string;
  username: string;
  comment: string;
  stars: number;
  sx?: SxProps<Theme>;
}

export function Comment(props: CommentProps): ReactNode {
  return (
    <Stack
      spacing={1}
      sx={{
        ///backgroundColor: "#f8f6f6",
        backgroundColor: "#1e1e1e",
        p: 1.5,
        borderRadius: 2,
        width: 300,
        minHeight: 50,
        boxShadow: 5,
        color: "#ffffff",
        ...props.sx,
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
        {props.title}
      </Typography>
      <Typography variant="body2">{props.username}</Typography>
      <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
        {props.comment}
      </Typography>

      <Rating
        name="read-only"
        value={props.stars}
        precision={1}
        readOnly
        size="small"
      />
    </Stack>
  );
}
