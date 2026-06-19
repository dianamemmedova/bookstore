export interface SidebarSection {
  title: string
  links: string[]
}

export interface SidebarProps {
  sections: SidebarSection[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface FaqAccordionProps {
  items: FaqItem[]
  title?: string
  defaultOpenIndex?: number | null
}