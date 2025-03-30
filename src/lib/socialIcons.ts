import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaXing,
} from 'react-icons/fa';
import { SiLeetcode, SiMedium } from 'react-icons/si';
import { BsStackOverflow } from 'react-icons/bs';
import { BiEnvelope } from 'react-icons/bi';

export const socialIcons = {
  github: { icon: FaGithub, color: '#333333' },
  linkedin: { icon: FaLinkedin, color: '#0077B5' },
  twitter: { icon: FaTwitter, color: '#1DA1F2' },
  leetcode: { icon: SiLeetcode, color: '#FFA116' },
  medium: { icon: SiMedium, color: '#000000' },
  stackoverflow: { icon: BsStackOverflow, color: '#F48024' },
  xing: { icon: FaXing, color: '#006567' },
} as const;

export const contactIcons = {
  email: { icon: BiEnvelope, color: '#6c6c6c' },
  phone: { icon: FaMobileAlt, color: '#6c6c6c' },
  location: { icon: FaMapMarkerAlt, color: '#6c6c6c' },
} as const;

export const getIcon = (network: string) =>
  socialIcons[network.toLowerCase() as keyof typeof socialIcons];
export const getContactIcon = (type: keyof typeof contactIcons) => contactIcons[type];
