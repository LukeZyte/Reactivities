import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { activitiesByDate, deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                    loading={loading && target === activity.id}
                    name={activity.id}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
