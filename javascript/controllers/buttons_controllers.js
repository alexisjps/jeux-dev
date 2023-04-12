// controllers/buttons_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
    static targets = ["button"];

    connect() {
        this.element.addEventListener("mousemove", (event) => this.moveButton(event));
        this.buttonTarget.addEventListener("click", (event) => this.showElapsedTime(event));
        this.timeoutId = null;
        this.startTime = new Date();
        if (this.isMobileDevice()) {
          this.intervalId = setInterval(() => {
            this.moveButtonRandomly();
          }, 250);
        } else {
          this.timeoutId = null;
        }
    }
    isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    showElapsedTime() {
        const elapsedTime = (new Date() - this.startTime) / 1000;
        const elapsedTimeElement = document.getElementById("elapsedTime");
        elapsedTimeElement.textContent = elapsedTime.toFixed(2);
      
        const timerModal = new bootstrap.Modal(document.getElementById("timerModal"));
        timerModal.show();
      }
    moveButton(event) {
      const button = this.buttonTarget;
      const rect = this.element.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      this.latestX = x;
      this.latestY = y;
  
      const buttonX = buttonRect.left - rect.left + buttonRect.width / 2;
      const buttonY = buttonRect.top - rect.top + buttonRect.height / 2;
  
      const distance = Math.sqrt(Math.pow(buttonX - x, 2) + Math.pow(buttonY - y, 2));
  
      if (distance < 50) {
        this.moveButtonRandomly();
  
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.moveButtonRandomly();
        }, 1000);
      } else {
        button.style.opacity = 1;
      }
    }
    moveButtonRandomly() {
      const button = this.buttonTarget;
      const rect = this.element.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
  
      let newX, newY;
      do {
        newX = Math.random() * (rect.width - buttonRect.width);
        newY = Math.random() * (rect.height - buttonRect.height);
      } while (
        Math.sqrt(Math.pow(newX + buttonRect.width / 2 - this.latestX, 2) + Math.pow(newY + buttonRect.height / 2 - this.latestY, 2)) < 50
      );
  
      button.style.left = `${newX}px`;
      button.style.top = `${newY}px`;
  
      const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
      const opacity = Math.max(0, 1 - this.latestDistance / maxDistance);
      button.style.opacity = opacity;
    }
}
