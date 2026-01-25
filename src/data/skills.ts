import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: '⌨️',
    skills: ['TypeScript', 'Python', 'Rust', 'Go', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    skills: ['React', 'Next.js', 'Vue', 'Tailwind', 'Three.js'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    title: 'AI / ML',
    icon: '🤖',
    skills: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenAI', 'Hugging Face'],
  },
  {
    title: 'DevOps',
    icon: '🚀',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform'],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    skills: ['Git', 'Linux', 'Neovim', 'Figma', 'Notion'],
  },
];
