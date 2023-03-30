import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
console.log(iframe);
const player = new Player(iframe);

const onPlay = function (data) {
  console.log(data);
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const time = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(time || 0);

player.setVolume(0.3);
