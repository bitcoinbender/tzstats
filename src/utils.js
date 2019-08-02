import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { format } from 'd3-format';
import { backerAccounts } from './config/backer-accounts';
import _ from 'lodash';
import StakingBond from './components/StakingBond';

TimeAgo.addLocale(en);
export const timeAgo = new TimeAgo('en-US');

export function convertMinutes(num) {
  const d = Math.floor(num / 1440);
  const h = Math.floor((num - d * 1440) / 60);
  const m = Math.round(num % 60);

  if (d > 0) {
    return d + 'd ' + h + 'h ' + m + 'm';
  } else {
    return h + 'h ' + m + 'm';
  }
}

export function formatValue(value, prefix = ',') {
  value = value || 0;
  return format(prefix)(value)
    .replace('M', ' M')
    .replace('k', ' k')
    .replace('G', ' G');
}
export function formatCurrency(value, prefix = ',', symbol = 'ꜩ') {
  value = value || 0;
  return prefix === ','
    ? `${format(prefix)(value)} ${symbol}`
    : value < 1000
      ? `${format(prefix)(value)} ${symbol}`
      : format(prefix)(value)
        .replace('M', ' M' + symbol)
        .replace('k', ' k' + symbol)
        .replace('G', ' G' + symbol)
}

export const addCommas = format(',');

export function wrapFlowData(flowData, account) {
  let inFlowData = { id: 'In-flow', color: '#1af3f9', data: [] };
  let outFlowData = { id: 'Out-flow', color: '#83899B', data: [], };

  let balance = account.spendable_balance;
  let dataInOut = [];

  //[0]-time [1]-in [2]-out
  flowData.reverse().map((item) => {
    let time = item[0];
    let inFlow = item[1];
    let outFlow = item[2];
    inFlowData.data.unshift({ x: time, y: inFlow });
    outFlowData.data.unshift({ x: time, y: -outFlow });
    dataInOut.unshift({ time: time, inFlow: inFlow, outFlow: -outFlow, balance: balance });
    balance += outFlow - inFlow;
  });
  return { inFlowData, outFlowData, dataInOut };
}

export function wrapToVolume(volSeries) {
  const sum = _.maxBy(volSeries, function (o) { return o[1]; })[1];

  let volumeData = volSeries.map((item, i) => {
    const percent = ((item[1] / sum) * 100).toFixed()
    const opacity = percent < 25 ? 0.1 : percent < 50 ? 0.3 : percent < 75 ? 0.6 : 0.9
    return {
      id: i,
      value: item[1],
      percent: percent,
      color: "#38E8FF",
      opacity: opacity,
      time: new Date(item[0]),
    }
  });
  return volumeData;
}

export function wrapStakingData({ balance, deposits, rewards, fees, account }) {
  let stakingBond = { id: 'Staking Bond', color: '#1af3f9', data: [] };
  let currentDeposit = { id: 'Current Deposit', color: '#83899B', data: [] };
  let pendingRewards = { id: 'Pending Rewards', color: '#83899B', data: [] };
  let spendableBalance = account.spendable_balance;
  let frozenDeposit = account.frozen_deposits;
  let frozenRewards = account.frozen_rewards;
  let frozenFees = account.frozen_fees;
  let allData = [];
  //[0]-time [1]-in [2]-out
  for (let i = balance.length-1; i>=0; i--) {
    let balanceIn = balance[i][1];
    let balanceOut = balance[i][2];

    let depositsIn = deposits[i][1];
    let depositsOut = deposits[i][2];

    let rewardsIn = rewards[i][1];
    let rewardsOut = rewards[i][2];

    let feesIn = fees[i][1];
    let feesOut = fees[i][2];

    //spandable_balance + frozen depozit
    stakingBond.data.unshift({ x: balance[i][0], y: spendableBalance + frozenDeposit });
    //frozen depozit
    currentDeposit.data.unshift({ x: balance[i][0], y: frozenDeposit });
    //frozen rewards + frozen fees
    pendingRewards.data.unshift({ x: balance[i][0], y: frozenRewards + frozenFees });

    allData.unshift({
      time: balance[i][0],
      bond: spendableBalance + frozenDeposit,
      deposit: frozenDeposit,
      rewards: frozenRewards + frozenFees
    })

    spendableBalance += balanceOut - balanceIn;
    frozenDeposit += depositsOut - depositsIn;
    frozenRewards += rewardsOut - rewardsIn;
    frozenFees += feesOut - feesIn;
  }
  return { stakingBond, currentDeposit, pendingRewards };
}

//Todo replace it with clean function
export function fixPercent(settings) {
  let totalPercent = settings.reduce(function (sum, value) {
    return sum + value.percent;
  }, 0);
  settings[0].percent = settings[0].percent + (100 - totalPercent); //Todo fix when 0%

  return settings;
};

export function getShortHash(hash) {
  return `${hash.slice(0, 7)}...${hash.slice(-4)}`;
}

export function capitalizeFirstLetter(str) {
  return `${str[0].toUpperCase() + str.slice(1)}`;
}

export function get60mTimeRange(lastTime) {
  let timeArray60m = [];
  const length = lastTime - 60000 * 60;
  for (let index = lastTime; index > length; index = index - 60000) {
    timeArray60m.push(index);
  }
  return timeArray60m;
}

export function wrappBlockDataToObj(array) {
  return array.reduce((obj, item) => {
    obj[new Date(item[0]).setSeconds(0, 0)] = {
      time: new Date(item[0]).setSeconds(0, 0),
      hash: item[1],
      height: item[2],
      priority: item[3],
      opacity: item[3] === 0
        ? 1
        : item[3] < 8
          ? 0.8
          : item[3] < 16
            ? 0.6
            : item[3] < 32
              ? 0.4
              : 0.2
    }
    return obj
  }, {})
}

export function getDelegatorByHash(hash) {
  return Object.keys(backerAccounts).filter(r => backerAccounts[r] === hash);
}

export function getPeakVolumeTime(data, hours = 1) {
  const stride = 24 / hours;
  let times = new Array(stride).fill(0);
  data.map((v, i) => { times[i % stride] += v.value; });
  const peak = times.indexOf(Math.max(...times));
  const a = "0" + peak * hours + ":00"; // 00:00 .. 20:00
  const b = "0" + (peak + 1) % stride * hours + ":00"; // 00:00 .. 20:00
  return a.substr(a.length - 5) + "-" + b.substr(b.length - 5);
}

export function getDailyVolume(data) {
  return _.sumBy(data, (o) => o.vol_base) / data.length;
}

export function convertToTitle(str) {
  return str.split("_").map(r => capitalizeFirstLetter(r)).join(' ');
}
export function getSearchType(searchValue) {
  return searchValue[0] === 'o'
    ? "operation"
    : (searchValue[0] === 'B' || parseInt(searchValue))
      ? "block"
      : searchValue[0] === 'P'
        ? "election"
        : "account";
}

