const fun = () => {
  const now = '' + Date.now();
  // console.log();
  process.stdout.write(now)
  setTimeout(() => fun(), 1000);
};

fun();