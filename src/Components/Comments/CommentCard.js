import { createStyles, Text, Avatar, Group, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export function CommentCard({ comment, deleteComment }) {
  const { classes } = useStyles();
  console.log(comment);
  return (
    <div>
      <Group>
        <Avatar src={"A"} alt={comment.userId} radius="xl" />
        <div>
          <Text size="sm">{comment.userId}</Text>
          <Text size="xs" color="dimmed"></Text>
        </div>
      </Group>
      <Text size="sm">{comment.text}</Text>
      <Button onClick={(e) => deleteComment(comment.id)}>Delete</Button>
    </div>
  );
}
