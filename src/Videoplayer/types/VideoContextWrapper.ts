import type React from "react";

export class VideoContextWrapper {
  videoContext: React.RefObject<HTMLVideoElement>;
  constructor(videoContext: React.RefObject<HTMLVideoElement>) {
    this.videoContext = videoContext;
  }

  checkContext(): this is VideoContextWrapper & {
    VideoContext: React.Ref<HTMLVideoElement>;
  } {
    if (this.videoContext.current === null) {
      throw "blayt";
    }
    return true;
  }

  public get time(): number {
    this.checkContext();
    return this.videoContext.current.currentTime;
  }
  public get pause(): boolean {
    this.checkContext();
    return this.videoContext.current.paused;
  }
  public get volume(): number {
    this.checkContext();
    return this.videoContext.current.volume;
  }
  public get duration(): number {
    this.checkContext();
    return this.videoContext.current.duration;
  }
  public get muted(): boolean {
    this.checkContext();
    return this.videoContext.current.muted;
  }
  public get buffered(): TimeRanges {
    this.checkContext();
    return this.videoContext.current.buffered;
  }

  setTime(time: number) {
    this.checkContext();
    this.videoContext.current.currentTime = time;
  }
  setPaused(pause: boolean) {
    this.checkContext();
    if (pause) {
      this.videoContext.current.pause();
    }
    this.videoContext.current.play();
  }
  setMute(mute: boolean) {
    this.checkContext();
    this.videoContext.current.muted = mute;
  }
  setVolume(volume: number) {
    this.checkContext();
    this.videoContext.current.volume = volume;
  }
  setRewind(time: number) {
    this.checkContext();
    this.videoContext.current.currentTime -= time;
  }
} //TODO: Короче, реализовать надо метод проверки контекста (на его существование то есть на NULL) а также начинать делать методы для изменения VideoContext пропертей по типу VideoContext.CurrentTime и тд и тп и XD
