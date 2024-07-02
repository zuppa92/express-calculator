function mean(nums) {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

function median(nums) {
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);

  return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mode(nums) {
  const freq = {};
  nums.forEach(num => {
    freq[num] = (freq[num] || 0) + 1;
  });

  let maxFreq = 0;
  let mode = null;

  for (const num in freq) {
    if (freq[num] > maxFreq) {
      maxFreq = freq[num];
      mode = num;
    }
  }

  return Number(mode);
}

module.exports = { mean, median, mode };
