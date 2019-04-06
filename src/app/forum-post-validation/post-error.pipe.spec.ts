import { PostErrorPipe } from './post-error.pipe';

describe('PostErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new PostErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
