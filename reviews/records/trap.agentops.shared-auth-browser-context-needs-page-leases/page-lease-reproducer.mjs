class SharedContext {
  constructor() {
    this.closed = false;
    this.activeLeases = 0;
  }
  newPage(name) {
    if (this.closed) throw new Error('context closed');
    return { name, closed: false, assertOpen: () => {
      if (this.closed) throw new Error(`${name}: context closed`);
    }};
  }
  close() {
    this.closed = true;
  }
  leasePage(name) {
    const page = this.newPage(name);
    this.activeLeases += 1;
    return {
      page,
      release: () => {
        page.closed = true;
        this.activeLeases -= 1;
        if (this.activeLeases === 0) this.close();
      },
    };
  }
}

function consumerOwnedCleanupBreaksSibling() {
  const ctx = new SharedContext();
  const a = ctx.newPage('job-a');
  const b = ctx.newPage('job-b');
  a.assertOpen();
  ctx.close();
  try {
    b.assertOpen();
    throw new Error('expected sibling failure did not happen');
  } catch (error) {
    if (!String(error.message).includes('context closed')) throw error;
  }
}

function pageLeasesPreserveSharedContextUntilLastRelease() {
  const ctx = new SharedContext();
  const a = ctx.leasePage('job-a');
  const b = ctx.leasePage('job-b');
  a.release();
  b.page.assertOpen();
  if (ctx.closed) throw new Error('context retired before last lease released');
  b.release();
  if (!ctx.closed) throw new Error('context did not retire after final lease');
}

consumerOwnedCleanupBreaksSibling();
pageLeasesPreserveSharedContextUntilLastRelease();
console.log('shared browser page lease reproducer passed');
