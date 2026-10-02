import Reveal from '@/components/Motion/Reveal';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import Section from '@/components/Section/Section';
import { GlassPopoverGroup } from '@/components/ui/GlassPopover';
import { QueryProvider } from '@/context/QueryProvider';
import { CapabilityGrid } from '@/features/home/components/CapabilityGrid';
import { ContactCta } from '@/features/home/components/ContactCta';
import { SelectedWorks } from '@/features/home/components/SelectedWorks';
import { GithubActivity } from '@/features/home/components/GithubActivity';
import { LivePersonality } from '@/features/home/components/LivePersonality';
import { PositioningStatement } from '@/features/home/components/PositioningStatement';
import { RecentlyPlayedMusic } from '@/features/home/components/RecentlyPlayedMusic';
import { TechStackFocus } from '@/features/home/components/TechStackFocus';
import { SELECTED_WORK_PAGE_NAMES } from '@/features/home/data/homeContent';
import { getWorks } from '@/features/works/data/worksData';

const selectedWorks = getWorks(SELECTED_WORK_PAGE_NAMES);

export default function ClassicHome() {
  return (
    <TransitionPageWrapper>
      <GlassPopoverGroup>
        <div className="flex flex-col gap-20 sm:gap-24">
          <Section>
            <PositioningStatement />
          </Section>
          <Section>
            <Reveal>
              <CapabilityGrid />
            </Reveal>
          </Section>
          <Section>
            <Reveal>
              <TechStackFocus />
            </Reveal>
          </Section>
          <Section>
            <Reveal>
              <SelectedWorks works={selectedWorks} />
            </Reveal>
          </Section>
          <Section>
            <Reveal>
              <QueryProvider>
                <LivePersonality
                  music={<RecentlyPlayedMusic />}
                  github={<GithubActivity />}
                />
              </QueryProvider>
            </Reveal>
          </Section>
          <Section>
            <Reveal>
              <ContactCta />
            </Reveal>
          </Section>
        </div>
      </GlassPopoverGroup>
    </TransitionPageWrapper>
  );
}
