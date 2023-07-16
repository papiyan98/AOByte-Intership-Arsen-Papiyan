import React from "react";

class Comment extends React.Component {
  onRateBtnClick = (event) => {    
    let rate;
    const commentInfo = event.target.closest('[data-commentinfo]').dataset.commentinfo;
    const anchorElem = event.target.closest('[data-tooltip]');

    if (!anchorElem || anchorElem.lastElementChild.textContent === 'Rated') return;

    const tooltipElem = document.createElement('div');

    const img = document.createElement('img');
    img.classList.add("rate-count");
    img.src = "./rate-icon.png";
    img.setAttribute('alt', "Comment rate");

    tooltipElem.className = 'tooltip';
    tooltipElem.append(img, img.cloneNode(true), img.cloneNode(true), img.cloneNode(true), img.cloneNode(true));

    Array.from(tooltipElem.children).forEach(child => {
      child.addEventListener('click', () => {
        for (let i = 0; i < tooltipElem.children.length; i++) {
          if (i <= Array.from(tooltipElem.children).indexOf(child)) {
            tooltipElem.children[i].src = "./star-icon.png";
          } else {
            tooltipElem.children[i].src = "./rate-icon.png";
          }
        }

        rate = Array.from(tooltipElem.children).indexOf(child) + 1;

        this.props.comment.isRated = true;
      });
    });

    document.body.append(tooltipElem);

    const coords = anchorElem.getBoundingClientRect();

    let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
      top = coords.top + anchorElem.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    tooltipElem.onpointerleave = () => {
      if (this.props.comment.isRated) {
        setTimeout(() => {
          Array.from(anchorElem.children).forEach(child => {
            switch (child.tagName) {
              case 'IMG':
                child.src = "./star-icon.png";
                break;
              case 'SPAN':
                child.innerHTML = "Rated"
                break;
              default:
                break;
            }
          });

          this.props.comment.isRated = true;

          this.props.updateCommentRate(this.props.postId, JSON.parse(commentInfo), rate)

          tooltipElem.remove();
        }, 200);
      } else {
        setTimeout(() => tooltipElem.remove(), 500);
      }
    }
  }

  render() {
    const rate = (!this.props.comment.rate) ? 0 : this.props.comment.rate;
    
    return (
      <div className="comment" data-commentinfo={JSON.stringify({comment: {...this.props.comment}, index: this.props.commentIndex})}>
        <div className="comment-info">
          <span className="comment-text">{this.props.comment.text}</span>
          <span className="comment-rate"><img src="./star-icon.png" alt="Comment Rate" />{this.props.comment.rate}</span>
        </div>
        <button className="rate-btn" onClick={(event) => this.onRateBtnClick(event)} data-tooltip><img src="./rate-icon.png" alt="Like" /><span>Rate</span></button>
      </div>
    )
  }
}

export default Comment;
