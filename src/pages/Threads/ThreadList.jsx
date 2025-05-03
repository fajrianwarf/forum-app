import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonCreateThread } from '@components/Threads/ButtonCreateThread';
import { ThreadItem } from '@components/Threads/ThreadItem';
import { PageLoader } from '@components/PageLoader';
import { Categories } from '@components/Categories';
import { getThreadListAct } from '@slices/Threads.slice';
import { getUsersAct } from '@slices/Users.slice';
import { useAuth } from '@utils/custom-hooks';
import { status } from '@utils/constants';

function ThreadList() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { statusList, threadList } = useSelector((state) => state.threads);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(threadList.map((thread) => thread.category))];

  const filteredThreads = threadList.filter((thread) =>
    selectedCategory ? thread.category === selectedCategory : true,
  );

  useEffect(() => {
    dispatch(getThreadListAct());
    dispatch(getUsersAct());
  }, [dispatch]);

  if (statusList === status.loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Categories
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {filteredThreads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
      {isAuthenticated && <ButtonCreateThread />}
    </>
  );
}

export { ThreadList };
