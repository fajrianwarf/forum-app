import { BASE_URL } from '@utils/constants';
import { submit } from '@utils/request';

const ThreadsService = {
  getThreadList,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
};

function getThreadList() {
  return submit('GET', `${BASE_URL}/threads`, {});
}

function getThreadDetail(id) {
  return submit('GET', `${BASE_URL}/threads/${id}`, {});
}

function createThread(payload) {
  return submit('POST', `${BASE_URL}/threads`, payload);
}

function createComment(payload) {
  const { threadId, body } = payload;
  return submit('POST', `${BASE_URL}/threads/${threadId}/comments`, body);
}

function upVoteThread(threadId) {
  return submit('POST', `${BASE_URL}/threads/${threadId}/up-vote`, {});
}

function downVoteThread(threadId) {
  return submit('POST', `${BASE_URL}/threads/${threadId}/down-vote`, {});
}

function neutralVoteThread(threadId) {
  return submit('POST', `${BASE_URL}/threads/${threadId}/neutral-vote`, {});
}

function upVoteComment({ threadId, commentId }) {
  return submit(
    'POST',
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {}
  );
}

function downVoteComment({ threadId, commentId }) {
  return submit(
    'POST',
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {}
  );
}

function neutralVoteComment({ threadId, commentId }) {
  return submit(
    'POST',
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {}
  );
}

export { ThreadsService };
