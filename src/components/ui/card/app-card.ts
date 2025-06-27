type CardSize = 'small' | 'medium' | 'large';

interface AppCardProps {
  size?: CardSize;
  children?: string | HTMLElement;
  className?: string;
}

export class AppCard {
  private props: AppCardProps;

  constructor(props: AppCardProps = {}) {
    this.props = props;
  }

  private getSizeClasses(size: CardSize): string {
    const sizeClasses = {
      small: 'p-3 text-sm',
      medium: 'p-4 text-base',
      large: 'p-6 text-lg'
    };
    return sizeClasses[size] || sizeClasses.medium;
  }

  render(): HTMLElement {
    const { size = 'medium', children, className = '' } = this.props;
    
    const card = document.createElement('div');
    card.className = `
      bg-white 
      border 
      border-gray-200 
      rounded-lg 
      shadow-sm 
      hover:shadow-md 
      transition-shadow 
      duration-200
      ${this.getSizeClasses(size)}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    if (children) {
      if (typeof children === 'string') {
        card.innerHTML = children;
      } else {
        card.appendChild(children);
      }
    }

    return card;
  }
}

export const createCard = (props: AppCardProps = {}) => {
  return new AppCard(props);
};
