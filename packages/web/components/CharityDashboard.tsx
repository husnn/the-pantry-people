import { Container, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import ListItemCard from '../components/ListItemCard';
import { getSummaryForCharity } from '../modules/api/charity';
import { CharitySummary, ListDTO, ListState } from '@tpp/shared';

const CharityDashboard = () => {
  const [summary, setSummary] = useState<CharitySummary>({
    available: [],
    processing: [],
    completed: []
  });

  useEffect(() => {
    getSummaryForCharity().then(setSummary);
  }, []);

  const removeFromList = (lists: ListDTO[], item: ListDTO): ListDTO[] => {
    const index = lists.findIndex((i) => i.id == item.id);
    if (index > -1) lists.splice(index, 1);
    return lists;
  };

  const ListColumn = ({
    title,
    collection
  }: {
    title: string;
    collection?: ListDTO[];
  }) => {
    return collection ? (
      <Grid xs={10} md={3} sx={{ px: 1 }}>
        <h3>{title}</h3>
        <Stack>
          {collection.map((list) => (
            <ListItemCard
              key={list.id}
              list={list}
              update={(list) => {
                switch (list.status) {
                  case ListState.PROCESSING:
                    removeFromList(summary.available, list);
                    summary.processing.push(list);
                    break;
                  case ListState.PARTLY_FULFILLED:
                  case ListState.FULFILLED:
                    removeFromList(summary.processing, list);
                    summary.completed.push(list);
                    break;
                  case ListState.CLOSED:
                    removeFromList(summary.completed, list);
                }
                setSummary({ ...summary });
              }}
            />
          ))}
        </Stack>
      </Grid>
    ) : null;
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={3}
        sx={{ mt: 2 }}
      >
        <ListColumn title="Lists in the area" collection={summary.available} />
        <ListColumn title="In progress" collection={summary.processing} />
        <ListColumn
          title="Awaiting collection"
          collection={summary.completed}
        />
      </Grid>
    </Container>
  );
};

export default CharityDashboard;
