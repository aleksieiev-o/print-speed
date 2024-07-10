import {FC, ReactElement, useContext, useEffect, useState} from 'react';
import {DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Crown, XCircle} from 'lucide-react';
import {Dialog, DialogClose} from '@radix-ui/react-dialog';
import {Button} from '@/components/ui/button';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import {EFinishGameStatus} from '@/store/GameStore/types';
import {useLocation} from 'react-router-dom';
import {VictoryConfettiContext} from '@/shared/providers/VictoryConfetti.provider';

const FinishGameStatusDialog: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {setConfettiStarted} = useContext(VictoryConfettiContext);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const location = useLocation();

  const changeDialogOpenStatus = (status: boolean): void => {
    setDialogOpen(status);

    if (gameStore.gameFinishStatus === EFinishGameStatus.SUCCESS && status === false) {
      setConfettiStarted(true);
    }
  };

  useEffect(() => {
    if (gameStore.gameFinishStatus === EFinishGameStatus.SUCCESS || gameStore.gameFinishStatus === EFinishGameStatus.FAILURE) {
      setDialogOpen(true);
    } else if (gameStore.gameFinishStatus === EFinishGameStatus.UNKNOWN) {
      setDialogOpen(false);
    }
  }, [gameStore.gameFinishStatus]);

  useEffect(() => {
    setDialogOpen(false);
  }, [location]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={changeDialogOpenStatus}>
      <DialogContent className={'sm:max-w-md'}>
        <DialogHeader>
          <DialogTitle>Game result</DialogTitle>
        </DialogHeader>

        <div className={'flex flex-col items-center justify-center gap-4 py-8'}>
          {gameStore.gameFinishStatus === EFinishGameStatus.SUCCESS ? (
            <>
              <Crown className={'h-20 w-20 stroke-yellow-500'} />

              <h1 className={'text-xl text-center text-green-600'}>Task completed successfully</h1>
            </>
          ) : (
            <>
              <XCircle className={'h-20 w-20 stroke-red-500'} />

              <h1 className={'text-xl text-center text-red-500'}>Task not completed</h1>
            </>
          )}
        </div>

        <DialogFooter className={'justify-end'}>
          <DialogClose asChild>
            <Button variant={'default'}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default FinishGameStatusDialog;
